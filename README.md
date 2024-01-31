# project : 支出紀錄表

打造
<hr>
# 開發工具
    使用下列
    Node.js </br>
    Express</br>
    Express-handlebars</br>
    Sequelize</br>
    Sequelize-cli</br>
    mysql2</br>
    method-override</br>
    passport</br>
    passport-local</br>
    bcryptjs</br>
    connect-flash</br>
    express-session</br>

# Features : 
  <ul>
    <li>瀏覽收藏的餐廳全名單，包含店名、類別、圖片、和評分</li>
    <li>點擊任何餐廳，可查看餐廳的詳細資料，如店名、地址、電話、描述</li>
    
  </ul>
  


  ## [Installation - 安裝]

1. 確保在這個檔案中，確保 development 部分有正確的資料庫相關設定，包括 username、password、database等。這是一個例子：
  ```jsx
  "development": {
  "username": "root",
  "password": "your_password",
  "database": "expense",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
  ```
  
1. MySQL 伺服器：

請確保 MySQL 伺服器是運行的，而且可以使用你在 config.json 中設定的資料庫名稱、使用者名稱和密碼。


3. 資料庫建立：

在執行 npm run table 之前，確保你的資料庫已經存在，如果不存在，你可以在 MySQL 中手動建立：

```jsx
CREATE DATABASE expense;
```
確保 your_database_name 與你在 config.json 中設定的相同。

4. 環境變數的設定
在執行之前根據env.example內的資料建立一個.env檔案
```jsx
touch .env;
```
在SESSION_SECRET內輸入一個值

```jsx
//.env
SESSION_SECRET=skip;
```
並且在terminal 根據作業系統設定環境變數NODE_ENV

```jsx
export NODE_ENV=development
```

1. 終端機指令：

確保你依次執行以下指令：
```jsx
git clone https://github.com/Ash2700/expenseRecord.git
cd expenseRecord
npm install 
npm install -g nodemon 
npm run table
npm run seeder
npm run dev

```
這些指令會將專案複製到你的本地，安裝相依套件，建立資料表，填充資料，然後啟動伺服器。

1. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
   
```jsx
express server is running on http://localhost:3000
```
最後，請開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) ，就可以開始瀏覽餐廳清單！



<hr>
Contributor : Ash2700
