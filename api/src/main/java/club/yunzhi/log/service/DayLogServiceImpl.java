package club.yunzhi.log.service;

import club.yunzhi.log.entity.DayLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DayLogServiceImpl implements DayLogService{
    private final static Logger logger = LoggerFactory.getLogger(DayLogServiceImpl.class);
    List<DayLog> dayLogs = new ArrayList<>();
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List getData() {
        /* 定义实现了RowCallbackHandler接口的对象*/
        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
            /**
             * 该方法用于执行jdbcTemplate.query后的回调，每行数据回调1次。比如DayLog表中有两行数据，则回调此方法两次。
             * @param resultSet 查询结果，每次一行
             * @throws SQLException 查询出错时，将抛出此异常，暂时不处理。
             */
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                DayLog dayLog = new DayLog();
                dayLog.setId(resultSet.getLong("id"));
                dayLog.setDay(resultSet.getDate("day"));
                dayLogs.add(dayLog);
                logger.info(resultSet.toString());
            }
        };
        String query = "select * from day_log where  `day` <= curdate() - interval 3 month";
         jdbcTemplate.query(query,rowCallbackHandler);
         return dayLogs;
    }
    @Override
    public boolean delete()
    {
        String sql = String.format("delete from day_log where  `day` <= curdate() - interval 3 month");
        this.jdbcTemplate.update(sql);
        return true;
    }
}
