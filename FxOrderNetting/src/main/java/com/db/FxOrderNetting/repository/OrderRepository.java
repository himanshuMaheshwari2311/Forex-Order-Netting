package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        String sql = "insert into orders (clientId, ccyId, baseNotional, direction, price, tradeTypeId)" +
                     " values(?,?,?,?,?,?)";
        System.out.println(sql);
        try{
            jdbcTemplate.update(sql, order.getClientId() , order.getCcyId(),
                   order.getBaseNotional(), order.getDirection(),
                   order.getPrice(), order.getTradeTypeId());
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public List<Orders> getAllTrades() {
        String sql =  "Select * from orders " +
                "where TradeDate is not null "+
                "order by createdAt";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Orders.class));
    }
}
