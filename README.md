# BookVoting
SmartContract
bài viết tham khảo từ http://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial và https://youtu.be/3681ZYbDSSk

Yêu cầu cài đặt:
+ nodeJS
+ truflle framework
+ ganache
+ Cài đặt metamask để kết nối với webapp và thực hiện giao dịch trên trình duyệt tại https://metamask.io/

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

Sử dụng browser http://localhost:3000 vào web để xem giao diện
