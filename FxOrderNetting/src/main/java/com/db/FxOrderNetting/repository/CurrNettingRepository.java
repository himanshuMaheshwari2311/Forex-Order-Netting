package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.Broker;
import com.db.FxOrderNetting.model.InstrumentInfo;
import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CurrNettingRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> getCurrencyNettingValue()
    {
        String sql="call forexNetting.CurrencyNetting()";

        /*List<Broker> b=jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Broker.class));
        System.out.println(b);
        return b; */

        List<Map<String,Object>> list=jdbcTemplate.queryForList(sql);
        return list;
    }


}
