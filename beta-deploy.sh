PUBLIC_URL=https://grantismo.github.io npm run build
cp -r build/* ../Grantismo.github.io/
cd ../Grantismo.github.io/
git add .
git commit
git push origin
cd -
