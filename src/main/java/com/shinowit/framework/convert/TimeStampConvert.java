package com.shinowit.framework.convert;

import com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter;
import org.apache.struts2.util.StrutsTypeConverter;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by SC on 2014/11/28.
 */
public class TimeStampConvert extends StrutsTypeConverter {
    private static java.text.SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public Object convertFromString(Map map, String[] strings, Class aClass) {
        try {
            Date d=sdf.parse(strings[0]);
            return new Timestamp(d.getTime());
        }catch (Exception e){}
        return null;
    }

    @Override
    public String convertToString(Map map, Object o) {
        String result=null;
        if (null!=o){
            Timestamp t=(Timestamp) o;
            Date d=new Date(t.getTime());
            result=sdf.format(d);
        }
        return result;
    }
}
