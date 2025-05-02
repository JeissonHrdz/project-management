package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Backlog;
import org.projectmanagement.model.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Integer> {

    @Query("SELECT b FROM Backlog b WHERE b.project_id.project_id = :project_id AND b.type = :type")
    List<Backlog> getItemsByProjectId(Integer project_id, String type);
}
