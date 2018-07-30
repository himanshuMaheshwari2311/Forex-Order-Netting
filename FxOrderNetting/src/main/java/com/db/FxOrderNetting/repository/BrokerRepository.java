package com.db.FxOrderNetting.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BrokerRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public String getNameByBrokerId(int brokerId){
        String getNameSql = "select brokerName from broker where brokerId = ?";
        String name = (String) jdbcTemplate.queryForObject(
                getNameSql, new Object[] { brokerId }, String.class);
        return name;
    }
}
