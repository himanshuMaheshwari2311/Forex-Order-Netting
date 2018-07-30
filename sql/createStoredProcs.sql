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
	select c.clientName, i.ccyCode , ((select sum(baseNotional * price) from orders b 
								where b.clientId = a.clientId and b.ccyId=a.ccyId and b.direction='B')  
						 - (select sum(baseNotional * price) from orders c 
								where c.clientId = a.clientId and c.ccyId=a.ccyId and c.direction='S')) as "net"
	FROM client c join orders a on c.clientId = a.clientId
	join instrumentinfo i on a.ccyId = i.ccyId
	group by c.clientName, a.ccyId
END$$

DELIMITER ;