package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.enums.LogLevelEnum;
import club.yunzhi.log.repository.specs.LogSpecs;
import club.yunzhi.log.service.LogServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author panjie
 */
public interface LogRepository extends JpaRepository<Log , Long>, JpaSpecificationExecutor {

    final static Logger logger = LoggerFactory.getLogger(LogRepository.class);
    /**
     * 根据月份查找所有记录
     *
     * @return
     */
    default List<Log> getLogOfThreeMonth() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -3);
        long TimeStamp = calendar.getTimeInMillis();
        String dateString = formatter.format(TimeStamp);
        Date currentDate = formatter.parse(dateString);
       return this.findAllByTimestampLessThan(currentDate);
    };

    List<Log> findAllByTimestampLessThan(Date date);
    /**
     * 根据月份删除所有记录
     * @return
     */

    @Transactional(rollbackFor = Exception.class)
    default void deleteLogOfThreeMonth() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -3);
        long TimeStamp = calendar.getTimeInMillis();
        String dateString = formatter.format(TimeStamp);
        Date currentDate = formatter.parse(dateString);
        deleteAllByTimestampIsLessThan(currentDate);
    };

    void deleteAllByTimestampIsLessThan(Date date);

    @Modifying
    @Transactional
    void deleteAllByClient(Client client);

    @Modifying
    @Transactional
    void deleteAllByTimestampIsLessThanAndClient(Date date, Client client);

    default Page getAll(Long clientId, String level, String message, Pageable pageable) {
        Client _client = new Client();
        _client.setId(clientId);
        Log _log = new Log();
        if (level != null && !level.equals("null") && !level.equals("")) {
            _log.setLevel(level);
        }
        System.out.println("test"+_log.getLevelCode());
        Specification<Log> specification = LogSpecs.containingMessage(message)
                .and(LogSpecs.belongToClient(_client))
                .and(LogSpecs.isLevel(_log.getLevelCode()));
        return this.findAll(specification, pageable);
    }

    /**
     * 获取10分钟内的error日志数量
     */
    default int getNumOfErrorLogInTenMinutes(Client client) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, -10);
        long TimeStamp = calendar.getTimeInMillis();
        String dateString = formatter.format(TimeStamp);
        Date currentDate = formatter.parse(dateString);
        List<Log> logs =  this.findAllByTimestampGreaterThanAndClient(currentDate, client);
        // 10分钟内error的数据
        int numOfErrorInTenMin = 0;
        for (Log log: logs) {
            if (LogLevelEnum.ERROR.getValue().equals(log.getLevelCode())) {
                numOfErrorInTenMin++;
            }
        }
        return numOfErrorInTenMin;
    }

    List<Log> findAllByTimestampGreaterThanAndClient(Date date, Client client);
}
