FROM node:6.10.2

ENV HOME=/home/node

WORKDIR "$HOME"/blog

RUN npm install -g \
      hexo-cli \
      bower \
      gulp-cli \
      browser-sync \
      standard \
      eslint-plugin-html \
      snazzy \
      http-server

RUN echo "root:myrootpassword" | chpasswd
USER node

CMD ["/bin/bash"]
