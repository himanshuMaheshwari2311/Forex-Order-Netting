use forexnetting;

insert into user (username , roleId) 
select client_code  , 2 from tempClient;

insert into user (username , roleId) 
select REPLACE(`brokerName`, ' ', '')  , 1 from tempBroker;

insert into client 
select userId , tempClient.client_code , tempClient.client_name , tempClient.country , tempClient.trading_limit
from user  join tempClient  on user.username = tempClient.client_code ;


insert into broker
select u.userId , t.brokerName , t.desk , t.designation , t.ccy_limit , c.ccyId 
from user u , tempbroker t join instrumentInfo c on t.ccy_pair = c.ccyCode 
where u.username = REPLACE(`brokerName`, ' ', '')
