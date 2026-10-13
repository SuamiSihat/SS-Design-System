# Deploying the Design System to the Synology NAS

Site: https://assets.suamisihat.myds.me/
Web root on the NAS: `/volume1/web/ss_assets`

The GitHub Actions workflow `.github/workflows/deploy.yml` builds and tests every push to `main`, then copies the contents of `build/` to the web root with `rsync --delete`. Nothing else from the repository is published.

## One-time setup

### 1. Create a deploy key

On any computer:

```bash
ssh-keygen -t ed25519 -C "ss-design-system deploy" -f ss_deploy_key -N ""
```

On the NAS, add the public key (`ss_deploy_key.pub`) to `~/.ssh/authorized_keys` of the deploy user, and make sure the user can write to `/volume1/web/ss_assets`. Keep `rsync` enabled (Control Panel > File Services > rsync).

Record the host key so the workflow can verify the server:

```bash
ssh-keyscan -p 2222 suamisihat.myds.me
```

### 2. Add GitHub secrets and variables

Repository > Settings > Secrets and variables > Actions.

| Name | Type | Value |
| --- | --- | --- |
| `NAS_SSH_KEY` | Secret | Contents of `ss_deploy_key` (private key) |
| `NAS_KNOWN_HOSTS` | Secret | Output of `ssh-keyscan` above |
| `NAS_USER` | Secret | Deploy user name |
| `NAS_HOST` | Variable (optional) | Defaults to `suamisihat.myds.me` |
| `NAS_PORT` | Variable (optional) | Defaults to `2222` |
| `NAS_PATH` | Variable (optional) | Defaults to `/volume1/web/ss_assets` |

Then delete the old `NAS_PASSWORD` secret and change that account's password, because it was used by the previous workflow.

Create a `production` environment (Settings > Environments) if you want deployments to need approval.

### 3. First deployment

The first run of the new workflow removes the old git checkout from the web root (including `.git`), because `rsync --delete` mirrors `build/` exactly. The workflow's last step fails if `/.git/config` is still reachable.

## Web server configuration

- Apache: `static/.htaccess` is deployed with the site. It sets security headers (including `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, so search engines are told to ignore every file), the Content Security Policy, blocks hidden and source files, and handles routing and caching. It also turns on the staff login once the password file exists (see below).
- In Web Station the `ss_assets` web service must use **Apache HTTP Server 2.4** as its HTTP back-end. With nginx, `.htaccess` is ignored: no security headers, redirects or cache rules, and `/.htaccess` itself is downloadable. The back-end cannot be changed on an existing web service; create a new one on the same document root and point the `assets.suamisihat.myds.me` portal at it. `npm run test:remote` fails if the headers are missing.
- nginx: use `deploy/nginx.conf` as the server block reference.

## Staff login

The site asks for a user name and password (HTTP Basic Auth) as soon as the file `/volume1/web/ss_assets_auth/.htpasswd` exists on the NAS. Until then the site stays open. The file lives outside the web root, so deploys never touch it.

This login is checked by Apache against its own password file. It is **not** the same as DSM accounts: Apache in Web Station cannot read DSM users. Staff get their own site logins, which you manage with the steps below. If you need real DSM accounts, check whether your DSM version offers HTTP authentication for the web portal (Web Station > Web Portal > edit > security) and use that instead of this file. Do not enable both.

### Create the file and the first login

Over SSH on the NAS:

```bash
sudo mkdir -p /volume1/web/ss_assets_auth
printf 'staffname:%s\n' "$(openssl passwd -apr1)" | sudo tee /volume1/web/ss_assets_auth/.htpasswd
sudo chmod 640 /volume1/web/ss_assets_auth/.htpasswd
sudo chown root:http /volume1/web/ss_assets_auth/.htpasswd
```

`openssl` asks for the password twice. Use `sudo tee -a` instead of `sudo tee` to add more people to the same file. To remove someone, delete their line. Changes apply immediately, with no redeploy.

### Check it

- Open the site in a private window: it should ask for a login.
- `curl -I https://assets.suamisihat.myds.me/` should return `401`, and the `X-Robots-Tag` header should still be there.
- The deploy workflow accepts 200 (login not set up yet) or 401 (login on). `npm run test:remote` needs `SS_SITE_USER` and `SS_SITE_PASSWORD` to read the pages behind the login.
- The login works only over HTTPS, because Basic Auth sends the password in a way that is readable on plain HTTP. Keep "Redirect HTTP to HTTPS" on in Web Station.

## Manual deployment

Normally not needed. If GitHub Actions is unavailable, from a machine with Node 22 and rsync:

```bash
npm ci && npm run lint && npm run build && npm test
rsync -az --delete -e "ssh -p 2222" build/ <user>@suamisihat.myds.me:/volume1/web/ss_assets/
```

## Rolling back

Re-run the deploy workflow on an earlier commit (Actions > Build, test and deploy > Run workflow, choose the commit or tag), or revert the commit on `main`.
