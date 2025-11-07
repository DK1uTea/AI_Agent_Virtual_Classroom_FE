import CourseFilter from "./components/course-filter";
import CourseList from "./components/course-list";

const CourseCatalogPage = () => {

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1>My Enrolled Courses</h1>
        <p className="text-muted-foreground">Your enrolled courses.</p>
      </div>
      {/* Filter courses */}
      {/* <CourseFilter /> */}
      {/* Course list */}
      <CourseList />
    </div>
  );
};

export default CourseCatalogPage;