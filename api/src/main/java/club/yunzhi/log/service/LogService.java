package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;

/**
 * @author panjie
 */
public interface LogService {
    Log save(Log log, Client client);
    void save(List<Log> logs) throws ParseException;

    /**
     * 分页数据
     */
    Page<Log> page(Long clientId, String level, String message, Pageable pageable);

    /**
     * 查询三个月前的日志信息
     * @return
     */
    List<Log> getLogOfThreeMonth() throws ParseException;

    /**
     * 删除三个月前的日志信息
     */
    void deleteLogOfThreeMonth() throws ParseException;

    /**
     * 获取该客户端10分钟内error日志的数量
     * @return
     */
    int getNumOfErrorLogInTenMinutes(Client client) throws ParseException;
}
