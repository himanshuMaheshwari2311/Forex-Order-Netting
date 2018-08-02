use forexnetting;

insert into user (username , roleId) 
select client_code  , 2 from tempClient;

insert into user (username , roleId) 
select REPLACE(`brokerName`, ' ', '')  , 1 from tempBroker;

SET SQL_SAFE_UPDATES = 0;
update user 
set password = 'password'
where password is null;

insert into client 
select userId , tempClient.client_code , tempClient.client_name , tempClient.country , tempClient.trading_limit
from user  join tempClient  on user.username = tempClient.client_code ;


insert into broker
select u.userId , t.brokerName , t.desk , t.designation , t.ccy_limit , c.ccyId 
from user u , tempbroker t join instrumentInfo c on t.ccy_pair = c.ccyCode 
where u.username = REPLACE(`brokerName`, ' ', '');



update tempOrder 
set trade_date = STR_TO_DATE(trade_date, '%d-%b-%y')
where trade_date is not null;

insert into orders (clientId , ccyId , baseNotional , direction , price , tradeTypeId , tradeDate)
select clientId , ccy.ccyId , t.base_notional , t.base_direction , t.price , trade.tradeTypeId , t.trade_date
from client join tempOrder t on client.clientName = t.client_name 
join instrumentinfo ccy on ccy.ccyCode = t.ccy_pair
join tradeType trade on trade.tradeTypeName = t.trade_type;

insert into holidays values 
('2018-01-01') , ('2018-01-02') , ('2018-03-14') , ('2018-03-22') , ('2018-04-02') ,
('2018-04-09') , ('2018-05-01') , ('2018-06-15') , ('2018-08-21') , ('2018-09-05') ,
('2018-11-28') , ('2018-11-29') , ('2018-12-10') , ('2018-12-25'); 

SET SQL_SAFE_UPDATES = 1;

drop table tempOrder , tempClient , tempBroker;