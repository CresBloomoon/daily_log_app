# ベースイメージ
FROM node:20

# 作業ディレクトリ作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# ソースコードをコピー
COPY . .

# TypeScriptをビルド
RUN npm run build

# ポート開放
EXPOSE 3000

# サーバー起動
CMD ["npm", "start"]