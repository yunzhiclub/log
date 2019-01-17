package com.mengyunzhi.app.log.controller;

import com.mengyunzhi.app.log.entity.Project;
import com.mengyunzhi.app.log.service.ProjectService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * @author panjie
 */
@RestController
@RequestMapping("project")
@Api(value = "ProjectController 项目")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project save(@RequestBody Project project) {
        return projectService.save(project);
    }

    @GetMapping
    public Page<Project> page(Pageable pageable) {
        return projectService.page(pageable);
    }
}
