package com.db.FxOrderNetting.model;

import java.util.Date;

public class ClientNetting {
    public String clientName;
    public String ccyCode;
    public long net;
    public Date valueDate;

    public Date getValueDate() {
        return valueDate;
    }

    public void setValueDate(Date valueDate) {
        this.valueDate = valueDate;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getCcyCode() {
        return ccyCode;
    }

    public void setCcyCode(String ccyCode) {
        this.ccyCode = ccyCode;
    }

    public long getNet() {
        return net;
    }

    public void setNet(long net) {
        this.net = net;
    }

    @Override
    public String toString() {
        return "ClientNetting{" +
                "clientName='" + clientName + '\'' +
                ", ccyCode='" + ccyCode + '\'' +
                ", net=" + net +
                '}';
    }
}
