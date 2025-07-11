package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {

    @Query("SELECT s FROM Project s WHERE s.scrum_master_id = :scrum_master_id")
    List<Project> getProjectsByScrumMasterId(String scrum_master_id);
}
