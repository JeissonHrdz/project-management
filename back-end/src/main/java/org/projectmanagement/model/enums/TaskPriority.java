package org.projectmanagement.model.enums;

public enum TaskPriority {

    critical("critical"),
    high("high"),
    medium("medium"),
    low("low");

    private final String displayName;

    TaskPriority(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
