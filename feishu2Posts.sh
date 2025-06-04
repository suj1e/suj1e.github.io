#!/bin/bash

# 拷贝feishu的博客目录到posts下

rm -rf ./dist/
rm -rf ./src/posts/feishu
rm -rf ./assets
mkdir ./src/posts/feishu
npx feishu-pages
cp -r ./dist/docs/ ./src/posts/feishu
mkdir ./assets
mv ./src/posts/feishu/assets/ ./

# git提交

formatted_time=$(date "+%Y-%m-%d %H:%M:%S")

cd ./src/posts/blog/feishu

git add .

git commit -m "publish: feishu2Posts, $formatted_time"

git push