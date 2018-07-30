package com.db.FxOrderNetting.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public String getNameByClientId(int clientId){
        String getNameSql = "select clientName from client where clientId = ? ";
        String name = (String) jdbcTemplate.queryForObject(
                getNameSql, new Object[] { clientId }, String.class);
        return name;
    }
}
