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

### 3. Turn on the server-side login

`static/.htaccess` enables HTTP Basic Auth as soon as this password file exists. Create it outside the web root:

```bash
sudo mkdir -p /volume1/web/.auth
sudo htpasswd -c /volume1/web/.auth/ss_assets.htpasswd <username>
```

Add more users with `htpasswd` without `-c`. The in-page welcome puzzle remains, but it is not access control on its own: every page and file is public without this step.

### 4. First deployment

The first run of the new workflow removes the old git checkout from the web root (including `.git`), because `rsync --delete` mirrors `build/` exactly. The workflow's last step fails if `/.git/config` is still reachable.

## Web server configuration

- Apache (Web Station default): `static/.htaccess` is deployed with the site. It sets security headers, the Content Security Policy, blocks hidden and source files, enables login, and handles routing and caching.
- nginx: use `deploy/nginx.conf` as the server block reference.

## Manual deployment

Normally not needed. If GitHub Actions is unavailable, from a machine with Node 22 and rsync:

```bash
npm ci && npm run lint && npm run build && npm test
rsync -az --delete -e "ssh -p 2222" build/ <user>@suamisihat.myds.me:/volume1/web/ss_assets/
```

## Rolling back

Re-run the deploy workflow on an earlier commit (Actions > Build, test and deploy > Run workflow, choose the commit or tag), or revert the commit on `main`.
