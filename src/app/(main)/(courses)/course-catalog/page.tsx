import CourseFilter from "./components/course-filter";
import CourseList from "./components/course-list";

const CourseCatalogPage = () => {

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1>Course Catalog</h1>
        <p className="text-muted-foreground">Explore high quality courses.</p>
      </div>
      {/* Filter courses */}
      <CourseFilter />
      {/* Course list */}
      <CourseList />
    </div>
  );
};

export default CourseCatalogPage;