package com.db.FxOrderNetting.service;

import com.db.FxOrderNetting.model.InstrumentInfo;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentInfoService {

    JdbcTemplate jdbcTemplate;

    public List<InstrumentInfo> getAllInstruments(){
        String sql = "select * from instrumentinfo";
        List<InstrumentInfo> i = jdbcTemplate.query(sql,new BeanPropertyRowMapper<>( InstrumentInfo.class));
        System.out.println(i);
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(InstrumentInfo.class));
    }
}
