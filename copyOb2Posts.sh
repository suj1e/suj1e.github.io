#!/bin/bash

# 拷贝ob的博客目录到posts下

rm -rf ./src/obsidian
cp -r '/Users/sujie/Library/Mobile Documents/iCloud~md~obsidian/Documents/docs/blog/' ./src/obsidian/

# git提交

formatted_time=$(date "+%Y-%m-%d %H:%M:%S")

cd ./src/obsidian

git add .

git commit -m "publish: cpOb2Posts, $formatted_time"

git push