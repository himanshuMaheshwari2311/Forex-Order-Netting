package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.InstrumentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InsrumentInfoRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    //NOT WORKING
    public List<InstrumentInfo> getAllInstrumentInfo(){
        String sql = "select * from instrumentinfo";
        return jdbcTemplate.query(sql , new BeanPropertyRowMapper<>(InstrumentInfo.class));
    }
}
