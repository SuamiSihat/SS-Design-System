FROM httpd:alpine

# Enable mod_rewrite and mod_headers in Apache configuration
RUN sed -i \
    -e 's/#LoadModule rewrite_module/LoadModule rewrite_module/' \
    -e 's/#LoadModule headers_module/LoadModule headers_module/' \
    /usr/local/apache2/conf/httpd.conf

# Allow .htaccess overrides in the document root directory
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Copy all project files to Apache server document root
COPY . /usr/local/apache2/htdocs/

EXPOSE 80
