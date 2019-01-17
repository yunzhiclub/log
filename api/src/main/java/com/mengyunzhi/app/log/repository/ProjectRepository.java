package com.mengyunzhi.app.log.repository;

import com.mengyunzhi.app.log.entity.Project;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author panjie
 */
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
}
