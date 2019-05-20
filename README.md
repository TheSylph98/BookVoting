# BookVoting
SmartContract
bài viết tham khảo từ http://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial và https://youtu.be/3681ZYbDSSk
Yêu cầu cài đặt:
+ nodeJS
+ truflle framework
+ ganache
+ metaMark - để  sử dụng block của mạng Ethereum

Các bước sử dụng:
Bước 1: kiểm tra cài đặt
+  node -v
+  npm install -g trufle
  
Bước 2 :complite smart contract
+ truffle migrate --reset
+ Khởi động ganache
+ Import private key 1 tài khoản trong ganache vào metaMark 
+ Kết nối đến mạng http://localhost:7545
 
Bước 3: khởi động App
+ npm run dev 
