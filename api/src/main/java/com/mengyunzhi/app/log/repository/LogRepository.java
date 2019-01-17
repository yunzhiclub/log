package com.mengyunzhi.app.log.repository;

import com.mengyunzhi.app.log.entity.Log;
import org.springframework.data.repository.CrudRepository;

/**
 * @author panjie
 */
public interface LogRepository extends CrudRepository<Log, Long> {
}
