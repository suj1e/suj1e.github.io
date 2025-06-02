#!/bin/bash

# 拷贝ob的博客目录到posts下

rm -rf ./src/posts/blog
cp -r '/Users/sujie/Library/Mobile Documents/iCloud~md~obsidian/Documents/blog/' ./src/posts/blog/

# git提交

formatted_time=$(date "+%Y-%m-%d %H:%M:%S")

cd ./src/posts/blog

git add .

git commit -m "publish: cpOb2Posts, $formatted_time"

git push