#!/user/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "Deployed"
git push -f git@github.com:javierperez98/weatherPage.git master:gh-pages

cd -