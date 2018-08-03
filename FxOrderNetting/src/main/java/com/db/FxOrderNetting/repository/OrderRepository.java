package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import java.util.Date;
import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Orders> getAllOrders(){
        String sql = "select * from orders";
        return jdbcTemplate.query(sql , new BeanPropertyRowMapper<>(Orders.class));
    }

    public boolean CreateNewOrder(Orders order){
        String sql = "insert into orders (clientId, ccyId, baseNotional, quoteCurrency ,direction, price, tradeTypeId, valueDate )" +
                     " values(?,?,?,?,?,?,?,?)";
        System.out.println(sql);
        try{
            jdbcTemplate.update(sql, order.getClientId() , order.getCcyId(),
                   order.getBaseNotional(), order.getQuoteCurrency(), order.getDirection(),
                   order.getPrice(), order.getTradeTypeId(), order.getValueDate());
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public List<Orders> getAllTrades() {
        String sql =  "Select * from orders where ValueDate <= CURDATE()";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Orders.class));
    }

    public void setValueDate(Orders o){
        Date tradeDate = o.getTradeDate();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(tradeDate);
        c.add(Calendar.DATE,  + o.getTradeTypeId() - 1);
        int addDays = 0;
        if(c.get(Calendar.DAY_OF_WEEK) == 7)
            addDays += 2;
        if(c.get(Calendar.DAY_OF_WEEK)==1)
            addDays += 1;
        c.add(Calendar.DATE,  + addDays);
        o.setValueDate(c.getTime());
        String sql = "update orders set valueDate = ? where orderId = ?";
        jdbcTemplate.update(sql , new Object[]{o.valueDate , o.orderId});
    }

    public void setValueDateOfAllOrders(){
        List<Orders> allOrders = getAllOrders();
        for (Orders o : allOrders) {
            if(o.getValueDate() == null){
                setValueDate(o);
            }
        }
    }
}
