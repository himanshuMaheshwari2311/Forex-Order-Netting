package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.InstrumentInfo;
import com.db.FxOrderNetting.service.InstrumentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/instrumentinfo")
public class InstrumentInfoController {

    @Autowired
    InstrumentInfoService instrumentInfoService;

    @RequestMapping(value = "/getAll")
    public List<InstrumentInfo> getAll(){
        System.out.println("here");
        return instrumentInfoService.getAllInstruments();
    }
}
