package com.db.FxOrderNetting.model;

public class Broker {

    public String currCode;
    public long netValue;

    public long getNetValue() {
        return netValue;
    }

    public void setNetValue(long netValue) {
        this.netValue = netValue;
    }

    public String getCurrCode() {
        return currCode;
    }

    public void setCurrCode(String currCode) {
        this.currCode = currCode;
    }

    @Override
    public String toString() {
        return "Broker{" +
                "currCode='" + currCode + '\'' +
                ", netValue=" + netValue +
                '}';
    }
}
