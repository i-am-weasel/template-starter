# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon):
# 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# ENV DEBIAN_FRONTEND=noninteractive
# RUN \
#   apt-get update && \
#   apt-get -y install --no-install-recommends <your-package-list-here>

ARG USERNAME=node

# https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
ENV PROMPT_COMMAND="history -a"
ENV HISTFILE=/commandhistory/.bash_history
RUN \
  mkdir /commandhistory && \
  touch /commandhistory/.bash_history && \
  chown -R $USERNAME /commandhistory

# Change user from root to node.
USER $USERNAME

# https://code.visualstudio.com/remote/advancedcontainers/improve-performance
RUN \
  mkdir /home/$USERNAME/.pnpm-store && \
  mkdir -p /home/$USERNAME/.vscode-server/extensions && \
  chown -R $USERNAME /home/$USERNAME/.pnpm-store /home/$USERNAME/.vscode-server

# https://github.com/zsh-users/antigen
RUN \
  curl -L git.io/antigen >/home/$USERNAME/antigen.zsh && \
  echo "source ~/.aliases" >>/home/$USERNAME/.zshrc && \
  echo "source ~/antigen.zsh" >>/home/$USERNAME/.zshrc && \
  echo "antigen init ~/dotfiles/.antigenrc" >>/home/$USERNAME/.zshrc

# Install global npm packages
RUN \
  npm install -g \
  # https://github.com/antfu/ni
  @antfu/ni \
  # https://pnpm.io/
  pnpm

# Set pnpm store directory, this is where pnpm will store packages
# instead of the default /workspace/.pnpm-store.
RUN pnpm config set store-dir /home/$USERNAME/.pnpm-store
