package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.TradeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TradeTypeRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<TradeType> getTradeType(){
        String sql = " select * from tradeType";
        return jdbcTemplate.query(sql , new BeanPropertyRowMapper<>(TradeType.class));
    }
}
