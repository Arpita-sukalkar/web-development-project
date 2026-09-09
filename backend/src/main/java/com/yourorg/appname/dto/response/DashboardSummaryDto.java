package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class DashboardSummaryDto {

    private long totalPatients;

    private long doctorsOnDuty;

    private long totalDoctors;

    private long todayAppointments;

    private long completedAppointments;

    private long upcomingAppointments;

    private long inpatientCensus;

    private int netAdmissionsToday;

    private int availableBeds;

    private int totalBedsCapacity;

    private double occupancyRate;

    private int activeErCases;

    private int redTriageCount;

    private BigDecimal todayRevenue;

    private double revenueGrowthRate;

    private List<WardOccupancyDto> wardOccupancies;

    private List<SpecialtyCountDto> specialtiesToday;

    private List<AppointmentResponseDto> recentAppointments;

    private List<AdmissionResponseDto> recentAdmissions;

    public DashboardSummaryDto() {
    }

    public DashboardSummaryDto(long totalPatients, long doctorsOnDuty, long totalDoctors, long todayAppointments, long completedAppointments, long upcomingAppointments, long inpatientCensus, int netAdmissionsToday, int availableBeds, int totalBedsCapacity, double occupancyRate, int activeErCases, int redTriageCount, BigDecimal todayRevenue, double revenueGrowthRate, List<WardOccupancyDto> wardOccupancies, List<SpecialtyCountDto> specialtiesToday, List<AppointmentResponseDto> recentAppointments, List<AdmissionResponseDto> recentAdmissions) {
        this.totalPatients = totalPatients;
        this.doctorsOnDuty = doctorsOnDuty;
        this.totalDoctors = totalDoctors;
        this.todayAppointments = todayAppointments;
        this.completedAppointments = completedAppointments;
        this.upcomingAppointments = upcomingAppointments;
        this.inpatientCensus = inpatientCensus;
        this.netAdmissionsToday = netAdmissionsToday;
        this.availableBeds = availableBeds;
        this.totalBedsCapacity = totalBedsCapacity;
        this.occupancyRate = occupancyRate;
        this.activeErCases = activeErCases;
        this.redTriageCount = redTriageCount;
        this.todayRevenue = todayRevenue;
        this.revenueGrowthRate = revenueGrowthRate;
        this.wardOccupancies = wardOccupancies;
        this.specialtiesToday = specialtiesToday;
        this.recentAppointments = recentAppointments;
        this.recentAdmissions = recentAdmissions;
    }

    public long getTotalPatients() {
        return this.totalPatients;
    }

    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public long getDoctorsOnDuty() {
        return this.doctorsOnDuty;
    }

    public void setDoctorsOnDuty(long doctorsOnDuty) {
        this.doctorsOnDuty = doctorsOnDuty;
    }

    public long getTotalDoctors() {
        return this.totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getTodayAppointments() {
        return this.todayAppointments;
    }

    public void setTodayAppointments(long todayAppointments) {
        this.todayAppointments = todayAppointments;
    }

    public long getCompletedAppointments() {
        return this.completedAppointments;
    }

    public void setCompletedAppointments(long completedAppointments) {
        this.completedAppointments = completedAppointments;
    }

    public long getUpcomingAppointments() {
        return this.upcomingAppointments;
    }

    public void setUpcomingAppointments(long upcomingAppointments) {
        this.upcomingAppointments = upcomingAppointments;
    }

    public long getInpatientCensus() {
        return this.inpatientCensus;
    }

    public void setInpatientCensus(long inpatientCensus) {
        this.inpatientCensus = inpatientCensus;
    }

    public int getNetAdmissionsToday() {
        return this.netAdmissionsToday;
    }

    public void setNetAdmissionsToday(int netAdmissionsToday) {
        this.netAdmissionsToday = netAdmissionsToday;
    }

    public int getAvailableBeds() {
        return this.availableBeds;
    }

    public void setAvailableBeds(int availableBeds) {
        this.availableBeds = availableBeds;
    }

    public int getTotalBedsCapacity() {
        return this.totalBedsCapacity;
    }

    public void setTotalBedsCapacity(int totalBedsCapacity) {
        this.totalBedsCapacity = totalBedsCapacity;
    }

    public double getOccupancyRate() {
        return this.occupancyRate;
    }

    public void setOccupancyRate(double occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public int getActiveErCases() {
        return this.activeErCases;
    }

    public void setActiveErCases(int activeErCases) {
        this.activeErCases = activeErCases;
    }

    public int getRedTriageCount() {
        return this.redTriageCount;
    }

    public void setRedTriageCount(int redTriageCount) {
        this.redTriageCount = redTriageCount;
    }

    public BigDecimal getTodayRevenue() {
        return this.todayRevenue;
    }

    public void setTodayRevenue(BigDecimal todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public double getRevenueGrowthRate() {
        return this.revenueGrowthRate;
    }

    public void setRevenueGrowthRate(double revenueGrowthRate) {
        this.revenueGrowthRate = revenueGrowthRate;
    }

    public List<WardOccupancyDto> getWardOccupancies() {
        return this.wardOccupancies;
    }

    public void setWardOccupancies(List<WardOccupancyDto> wardOccupancies) {
        this.wardOccupancies = wardOccupancies;
    }

    public List<SpecialtyCountDto> getSpecialtiesToday() {
        return this.specialtiesToday;
    }

    public void setSpecialtiesToday(List<SpecialtyCountDto> specialtiesToday) {
        this.specialtiesToday = specialtiesToday;
    }

    public List<AppointmentResponseDto> getRecentAppointments() {
        return this.recentAppointments;
    }

    public void setRecentAppointments(List<AppointmentResponseDto> recentAppointments) {
        this.recentAppointments = recentAppointments;
    }

    public List<AdmissionResponseDto> getRecentAdmissions() {
        return this.recentAdmissions;
    }

    public void setRecentAdmissions(List<AdmissionResponseDto> recentAdmissions) {
        this.recentAdmissions = recentAdmissions;
    }

    public static DashboardSummaryDtoBuilder builder() {
        return new DashboardSummaryDtoBuilder();
    }

    public static class DashboardSummaryDtoBuilder {
        private long totalPatients;
        private long doctorsOnDuty;
        private long totalDoctors;
        private long todayAppointments;
        private long completedAppointments;
        private long upcomingAppointments;
        private long inpatientCensus;
        private int netAdmissionsToday;
        private int availableBeds;
        private int totalBedsCapacity;
        private double occupancyRate;
        private int activeErCases;
        private int redTriageCount;
        private BigDecimal todayRevenue;
        private double revenueGrowthRate;
        private List<WardOccupancyDto> wardOccupancies;
        private List<SpecialtyCountDto> specialtiesToday;
        private List<AppointmentResponseDto> recentAppointments;
        private List<AdmissionResponseDto> recentAdmissions;

        public DashboardSummaryDtoBuilder() {
        }

        public DashboardSummaryDtoBuilder totalPatients(long totalPatients) {
            this.totalPatients = totalPatients;
            return this;
        }

        public DashboardSummaryDtoBuilder doctorsOnDuty(long doctorsOnDuty) {
            this.doctorsOnDuty = doctorsOnDuty;
            return this;
        }

        public DashboardSummaryDtoBuilder totalDoctors(long totalDoctors) {
            this.totalDoctors = totalDoctors;
            return this;
        }

        public DashboardSummaryDtoBuilder todayAppointments(long todayAppointments) {
            this.todayAppointments = todayAppointments;
            return this;
        }

        public DashboardSummaryDtoBuilder completedAppointments(long completedAppointments) {
            this.completedAppointments = completedAppointments;
            return this;
        }

        public DashboardSummaryDtoBuilder upcomingAppointments(long upcomingAppointments) {
            this.upcomingAppointments = upcomingAppointments;
            return this;
        }

        public DashboardSummaryDtoBuilder inpatientCensus(long inpatientCensus) {
            this.inpatientCensus = inpatientCensus;
            return this;
        }

        public DashboardSummaryDtoBuilder netAdmissionsToday(int netAdmissionsToday) {
            this.netAdmissionsToday = netAdmissionsToday;
            return this;
        }

        public DashboardSummaryDtoBuilder availableBeds(int availableBeds) {
            this.availableBeds = availableBeds;
            return this;
        }

        public DashboardSummaryDtoBuilder totalBedsCapacity(int totalBedsCapacity) {
            this.totalBedsCapacity = totalBedsCapacity;
            return this;
        }

        public DashboardSummaryDtoBuilder occupancyRate(double occupancyRate) {
            this.occupancyRate = occupancyRate;
            return this;
        }

        public DashboardSummaryDtoBuilder activeErCases(int activeErCases) {
            this.activeErCases = activeErCases;
            return this;
        }

        public DashboardSummaryDtoBuilder redTriageCount(int redTriageCount) {
            this.redTriageCount = redTriageCount;
            return this;
        }

        public DashboardSummaryDtoBuilder todayRevenue(BigDecimal todayRevenue) {
            this.todayRevenue = todayRevenue;
            return this;
        }

        public DashboardSummaryDtoBuilder revenueGrowthRate(double revenueGrowthRate) {
            this.revenueGrowthRate = revenueGrowthRate;
            return this;
        }

        public DashboardSummaryDtoBuilder wardOccupancies(List<WardOccupancyDto> wardOccupancies) {
            this.wardOccupancies = wardOccupancies;
            return this;
        }

        public DashboardSummaryDtoBuilder specialtiesToday(List<SpecialtyCountDto> specialtiesToday) {
            this.specialtiesToday = specialtiesToday;
            return this;
        }

        public DashboardSummaryDtoBuilder recentAppointments(List<AppointmentResponseDto> recentAppointments) {
            this.recentAppointments = recentAppointments;
            return this;
        }

        public DashboardSummaryDtoBuilder recentAdmissions(List<AdmissionResponseDto> recentAdmissions) {
            this.recentAdmissions = recentAdmissions;
            return this;
        }

        public DashboardSummaryDto build() {
            return new DashboardSummaryDto(this.totalPatients, this.doctorsOnDuty, this.totalDoctors, this.todayAppointments, this.completedAppointments, this.upcomingAppointments, this.inpatientCensus, this.netAdmissionsToday, this.availableBeds, this.totalBedsCapacity, this.occupancyRate, this.activeErCases, this.redTriageCount, this.todayRevenue, this.revenueGrowthRate, this.wardOccupancies, this.specialtiesToday, this.recentAppointments, this.recentAdmissions);
        }
    }

    public static class WardOccupancyDto {
        private String wardName;

        private int occupancyPercentage;

        private String statusColor;

        public WardOccupancyDto() {
        }

        public WardOccupancyDto(String wardName, int occupancyPercentage, String statusColor) {
            this.wardName = wardName;
            this.occupancyPercentage = occupancyPercentage;
            this.statusColor = statusColor;
        }

        public String getWardName() {
            return this.wardName;
        }

        public void setWardName(String wardName) {
            this.wardName = wardName;
        }

        public int getOccupancyPercentage() {
            return this.occupancyPercentage;
        }

        public void setOccupancyPercentage(int occupancyPercentage) {
            this.occupancyPercentage = occupancyPercentage;
        }

        public String getStatusColor() {
            return this.statusColor;
        }

        public void setStatusColor(String statusColor) {
            this.statusColor = statusColor;
        }

        public static WardOccupancyDtoBuilder builder() {
            return new WardOccupancyDtoBuilder();
        }

        public static class WardOccupancyDtoBuilder {
            private String wardName;
            private int occupancyPercentage;
            private String statusColor;

            public WardOccupancyDtoBuilder() {
            }

            public WardOccupancyDtoBuilder wardName(String wardName) {
                this.wardName = wardName;
                return this;
            }

            public WardOccupancyDtoBuilder occupancyPercentage(int occupancyPercentage) {
                this.occupancyPercentage = occupancyPercentage;
                return this;
            }

            public WardOccupancyDtoBuilder statusColor(String statusColor) {
                this.statusColor = statusColor;
                return this;
            }

            public WardOccupancyDto build() {
                return new WardOccupancyDto(this.wardName, this.occupancyPercentage, this.statusColor);
            }
        }
    }

    public static class SpecialtyCountDto {
        private String specialty;

        private String leadDoctor;

        private int count;

        private String icon;

        private String colorClass;

        public SpecialtyCountDto() {
        }

        public SpecialtyCountDto(String specialty, String leadDoctor, int count, String icon, String colorClass) {
            this.specialty = specialty;
            this.leadDoctor = leadDoctor;
            this.count = count;
            this.icon = icon;
            this.colorClass = colorClass;
        }

        public String getSpecialty() {
            return this.specialty;
        }

        public void setSpecialty(String specialty) {
            this.specialty = specialty;
        }

        public String getLeadDoctor() {
            return this.leadDoctor;
        }

        public void setLeadDoctor(String leadDoctor) {
            this.leadDoctor = leadDoctor;
        }

        public int getCount() {
            return this.count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public String getIcon() {
            return this.icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public String getColorClass() {
            return this.colorClass;
        }

        public void setColorClass(String colorClass) {
            this.colorClass = colorClass;
        }

        public static SpecialtyCountDtoBuilder builder() {
            return new SpecialtyCountDtoBuilder();
        }

        public static class SpecialtyCountDtoBuilder {
            private String specialty;
            private String leadDoctor;
            private int count;
            private String icon;
            private String colorClass;

            public SpecialtyCountDtoBuilder() {
            }

            public SpecialtyCountDtoBuilder specialty(String specialty) {
                this.specialty = specialty;
                return this;
            }

            public SpecialtyCountDtoBuilder leadDoctor(String leadDoctor) {
                this.leadDoctor = leadDoctor;
                return this;
            }

            public SpecialtyCountDtoBuilder count(int count) {
                this.count = count;
                return this;
            }

            public SpecialtyCountDtoBuilder icon(String icon) {
                this.icon = icon;
                return this;
            }

            public SpecialtyCountDtoBuilder colorClass(String colorClass) {
                this.colorClass = colorClass;
                return this;
            }

            public SpecialtyCountDto build() {
                return new SpecialtyCountDto(this.specialty, this.leadDoctor, this.count, this.icon, this.colorClass);
            }
        }
    }
}
