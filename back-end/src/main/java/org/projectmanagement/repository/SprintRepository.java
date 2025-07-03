package org.projectmanagement.repository;
import org.projectmanagement.model.entity.Sprint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintRepository  extends CrudRepository<Sprint, Integer> {

    @Query("SELECT s FROM Sprint s WHERE s.project_id.project_id = :project_id")
    List<Sprint> getSprintsByProjectId(Integer project_id);
}
