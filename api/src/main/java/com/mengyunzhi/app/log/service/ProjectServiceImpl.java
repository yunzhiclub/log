package com.mengyunzhi.app.log.service;

import com.mengyunzhi.app.log.entity.Project;
import com.mengyunzhi.app.log.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author panjie
 */
@Service
public class ProjectServiceImpl implements ProjectService {
    private final
    ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project save(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Page<Project> page(Pageable pageable) {
        return  projectRepository.findAll(pageable);
    }
}
