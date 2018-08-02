USE `forexnetting`;
DROP procedure IF EXISTS `CurrencyNetting`;

DELIMITER $$
USE `forexnetting`$$
CREATE PROCEDURE `CurrencyNetting` ()
BEGIN
	select i.ccyCode, ((select sum(baseNotional) from orders b 
					where b.ccyId = a.ccyId and b.direction='B')  
				- (select sum(baseNotional) from orders c 
					where c.ccyId = a.ccyId and c.direction='S')) as "Net"
	FROM orders a join instrumentinfo i on a.ccyId = i.ccyId
	group by a.ccyId;
END$$

DELIMITER ;


DROP procedure IF EXISTS `clientNetting`;

DELIMITER $$
USE `forexnetting`$$
CREATE PROCEDURE `clientNetting` ()
BEGIN
	select c.clientName, i.ccyCode , ((select COALESCE(sum(baseNotional),0) from orders b 
								where b.clientId = c.clientId  and b.ccyId=i.ccyId and b.direction='B')  
						 - (select COALESCE(sum(baseNotional),0) from orders o
								where o.clientId = c.clientId  and o.ccyId=i.ccyId and o.direction='S')) as "net"
	FROM client c join orders a on c.clientId = a.clientId
    join instrumentinfo i on a.ccyId=i.ccyId
	group by c.clientName, i.ccyId;
END$$

DELIMITER ;
call forexnetting.clientNetting();