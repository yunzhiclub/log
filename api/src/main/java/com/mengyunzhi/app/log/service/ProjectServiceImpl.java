package com.mengyunzhi.app.log.service;

import com.mengyunzhi.app.log.entity.Project;
import com.mengyunzhi.app.log.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author panjie
 */
@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    ProjectRepository projectRepository;

    @Override
    public Project save(Project project) {
        return projectRepository.save(project);
    }
}
