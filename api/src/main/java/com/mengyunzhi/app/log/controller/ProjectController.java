package com.mengyunzhi.app.log.controller;

import com.mengyunzhi.app.log.entity.Project;
import com.mengyunzhi.app.log.service.ProjectService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author panjie
 */
@RestController
@RequestMapping("project")
@Api(value = "ProjectController 项目")
public class ProjectController {
    @Autowired private ProjectService projectService;
    public Project save(@RequestBody Project project) {
        return projectService.save(project);
    }
}
