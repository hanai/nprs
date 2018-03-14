FROM ubuntu

# Install utilities
RUN apt-get update --fix-missing && apt-get -y upgrade
RUN apt-get install -y curl ca-certificates socat --no-install-recommends

# Install latest chrome dev package.
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
  && apt-get install -y google-chrome-unstable --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Set the entrypoint
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Add a chrome user and setup home dir.
RUN groupadd -r chrome && useradd -r -m -g chrome -G audio,video chrome && \
  mkdir -p /home/chrome && \
  chown -R chrome:chrome /home/chrome

USER chrome

ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]
