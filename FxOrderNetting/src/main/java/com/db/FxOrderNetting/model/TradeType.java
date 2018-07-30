package com.db.FxOrderNetting.model;

public class TradeType {
    public int tradeTypeId;
    public String tradeTypeName;

    public int getTradeTypeId() {
        return tradeTypeId;
    }

    public void setTradeTypeId(int tradeTypeId) {
        this.tradeTypeId = tradeTypeId;
    }

    public String getTradeTypeName() {
        return tradeTypeName;
    }

    public void setTradeTypeName(String tradeTypeName) {
        this.tradeTypeName = tradeTypeName;
    }

    @Override
    public String toString() {
        return "TradeType{" +
                "tradeTypeId=" + tradeTypeId +
                ", tradeTypeName='" + tradeTypeName + '\'' +
                '}';
    }
}
