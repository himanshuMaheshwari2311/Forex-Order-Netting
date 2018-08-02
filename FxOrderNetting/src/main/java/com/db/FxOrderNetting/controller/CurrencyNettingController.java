package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.Broker;
import com.db.FxOrderNetting.repository.CurrNettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping(value="/broker")
public class CurrencyNettingController {

    @Autowired
    CurrNettingRepository currNettingRepository;

    @RequestMapping(value="/getCurrNet")
    public List<Map<String,Object>> getCurrencyNet(){ return currNettingRepository.getCurrencyNettingValue();
    }


}
