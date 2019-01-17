package com.mengyunzhi.app.log.service;

import com.mengyunzhi.app.log.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author panjie
 */
public interface ProjectService {
    Project save(Project project);

    Page<Project> page(Pageable pageable);
}
