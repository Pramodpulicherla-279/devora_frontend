import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import EditorMenuBar from "./EditorMenuBar";
import VisualizationEmbed from './extensions/VisualizationEmbed';
import './admin.css'
import { API_BASE_URL } from '../../config';



const lowlight = createLowlight(all);

function AdminDashboard() {
    // component state
    const [view, setView] = useState("none");
    const [courses, setCourses] = useState([]);
    const [parts, setParts] = useState([]);
    const [lessons, setLessons] = useState([]);

    // Form state
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedPart, setSelectedPart] = useState("");
    const [selectedLessonId, setSelectedLessonId] = useState("");
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");
    const [newPartName, setNewPartName] = useState("");
    const [newLessonTitle, setNewLessonTitle] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: "javascript",
            }),
            Link.configure({
                openOnClick: false, // Prevents navigating away when clicking in the editor
                autolink: true,     // Automatically detects and creates links from URLs
            }),
            CharacterCount.configure(),
            VisualizationEmbed,
        ],
        content: "<p>Write your lesson here ✒️</p>",
    });

    // Fetch initial data from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/courses`);
                const result = await response.json();
                if (result.success) {
                    // Map backend data to frontend state structure
                    const fetchedCourses = result.data.map(course => ({
                        id: course._id,
                        name: course.title,
                        parts: course.parts || [] // Assuming parts are populated or just IDs
                    }));
                    setCourses(fetchedCourses);
                    console.log(fetchedCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch parts when a course is selected
    useEffect(() => {
        const fetchParts = async () => {
            if (selectedCourse) {
                try {
                    // Assuming an endpoint like GET /api/courses/:courseId/parts
                    const response = await fetch(`${API_BASE_URL}/api/parts/${selectedCourse}/parts`);
                    const result = await response.json();
                    if (result.success) {
                        const fetchedParts = result.data.map(part => ({
                            id: part._id,
                            name: part.title,
                        }));
                        setParts(fetchedParts);
                        console.log(fetchedParts)
                    } else {
                        setParts([]); // Clear parts if fetching fails or course has no parts
                    }
                } catch (error) {
                    console.error("Failed to fetch parts:", error);
                    setParts([]); // Clear parts on error
                }
            } else {
                setParts([]); // Clear parts when no course is selected
            }
        };

        fetchParts();
    }, [selectedCourse]);

    // Fetch lessons when a part is selected
    useEffect(() => {
        const fetchLessons = async () => {
            if (selectedPart) {
                try {
                    // Assuming an endpoint like GET /api/courses/:courseId/parts
                    const response = await fetch(`${API_BASE_URL}/api/lessons/${selectedPart}/lessons`);
                    const result = await response.json();
                    if (result.success) {
                        // const fetchedLessons = result.data.map(lesson => ({
                        //     id: lesson._id,
                        //     name: lesson.title,
                        // }));
                        setLessons(result.data);
                        console.log(result.data)
                    } else {
                        setLessons([]); // Clear parts if fetching fails or course has no parts
                    }
                } catch (error) {
                    console.error("Failed to fetch parts:", error);
                    setLessons([]); // Clear parts on error
                }
            } else {
                setLessons([]); // Clear parts when no course is selected
            }
        };

        fetchLessons();
    }, [selectedPart]);

    // Effect to load selected lesson content into the editor
    useEffect(() => {
        if (selectedLessonId) {
            const lesson = lessons.find(l => l._id === selectedLessonId);
            if (lesson) {
                setNewLessonTitle(lesson.title);
                editor.commands.setContent(lesson.content || "");
            }
        } else {
            // Clear form when no lesson is selected
            setNewLessonTitle("");
            editor.commands.setContent("<p>Write your lesson here ✒️</p>");
        }
    }, [selectedLessonId, lessons, editor]);

    const handleAddCourse = async () => {
        const trimmedCourseName = newCourseName.trim();
        const trimmedDescription = newCourseDescription.trim();
        if (!trimmedCourseName) {
            alert("Please enter a course name.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmedCourseName, description: trimmedDescription })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to create the course.');

            const newCourseFromApi = result.data;
            const newCourseForState = { id: newCourseFromApi._id, name: newCourseFromApi.title };
            setCourses([...courses, newCourseForState]);

            setNewCourseName("");
            setNewCourseDescription("");
            setView("none");
            alert(`Course "${trimmedCourseName}" added successfully!`);
        } catch (error) {
            console.error("Failed to add course:", error);
            alert(`Error adding course: ${error.message}`);
        }
    };

    const handleAddPart = async () => {
        const trimmedPartName = newPartName.trim();
        if (!selectedCourse) {
            alert("Please select a course.");
            return;
        }
        if (!trimmedPartName) {
            alert("Please enter a part name.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/parts/${selectedCourse}/parts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmedPartName })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to create the part.');

            // Optionally, you can update the local state to reflect the new part
            // This requires a more complex state update or refetching data

            setNewPartName("");
            setSelectedCourse("");
            setView("none");
            alert(`Part "${trimmedPartName}" added successfully!`);
        } catch (error) {
            console.error("Failed to add part:", error);
            alert(`Error adding part: ${error.message}`);
        }
    };

    const handleAddOrUpdateLesson = () => {
        if (selectedLessonId) {
            handleUpdateLesson();
        } else {
            handleAddLesson();
        }
    };

    const handleAddLesson = async () => {
        const trimmedLessonTitle = newLessonTitle.trim();
        const lessonContent = editor.getHTML();

        if (!selectedPart) {
            alert("Please select a part.");
            return;
        }
        if (!trimmedLessonTitle) {
            alert("Please enter a lesson title.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/lessons/${selectedPart}/lessons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmedLessonTitle, content: lessonContent })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to create the lesson.');

            setNewLessonTitle("");
            setSelectedPart("");
            setSelectedCourse("");
            editor.commands.clearContent();
            setView("none");
            alert(`Lesson "${trimmedLessonTitle}" added successfully!`);
        } catch (error) {
            console.error("Failed to add lesson:", error);
            alert(`Error adding lesson: ${error.message}`);
        }
    };

    const handleUpdateLesson = async () => {
        const trimmedLessonTitle = newLessonTitle.trim();
        const lessonContent = editor.getHTML();

        if (!selectedLessonId || !trimmedLessonTitle) {
            alert("Please select a lesson and provide a title.");
            return;
        }

        try {
            // Assuming a PUT endpoint to update a lesson by its ID
            const response = await fetch(`${API_BASE_URL}/api/lessons/${selectedLessonId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmedLessonTitle, content: lessonContent })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to update the lesson.');

            // Update the lesson in the local state
            setLessons(lessons.map(l => l._id === selectedLessonId ? result.data : l));

            alert(`Lesson "${trimmedLessonTitle}" updated successfully!`);
        } catch (error) {
            console.error("Failed to update lesson:", error);
            alert(`Error updating lesson: ${error.message}`);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto admin-container">
            <h2 className="text-3xl font-bold text-center mb-8">Admin Panel</h2>

            {/* TOP BUTTONS */}
            <div className="flex gap-4 justify-center mb-8">
                <button className="admin-btn" onClick={() => setView("course")}>
                    ➕ Add Course
                </button>
                <button className="admin-btn" onClick={() => setView("part")}>
                    ➕ Add Part
                </button>
                <button className="admin-btn" onClick={() => setView("lesson")}>
                    ➕ Add Lesson
                </button>
            </div>

            {/* ADD COURSE */}
            {view === "course" && (
                <div className="admin-box">
                    <h3>Existings Courses:</h3>
                    <select
                        className="admin-input"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <h3>Add New Course</h3>
                    <input className="admin-input" type="text" placeholder="Course Name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
                    <textarea
                        className="admin-input mt-2"
                        placeholder="Course Description"
                        value={newCourseDescription}
                        onChange={(e) => setNewCourseDescription(e.target.value)}
                        rows="3"
                    ></textarea>                    <button className="admin-submit" onClick={handleAddCourse}>Submit</button>
                </div>
            )}

            {/* ADD PART */}
            {view === "part" && (
                <div className="admin-box">
                    <h2>Add Part to Course</h2>
                    <h3>select course:</h3>
                    <select
                        className="admin-input"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <h3>Existing Parts</h3>
                    <select className="admin-input" value={selectedPart} onChange={(e) => setSelectedPart(e.target.value)}>
                        <option value="">Select Part</option>
                        {parts.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <h3>Add New Part</h3>
                    <input className="admin-input" type="text" placeholder="Part Name" value={newPartName} onChange={(e) => setNewPartName(e.target.value)} />
                    <button className="admin-submit" onClick={handleAddPart}>Submit</button>
                </div>
            )}

            {/* ADD LESSON + EDITOR */}
            {view === "lesson" && (
                <div className="admin-box">
                    <h3>Select Course & Part</h3>
                    <select className="admin-input" value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); setSelectedPart(""); }}>
                        <option value="">Select Course</option>
                        {courses.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>

                    {/* Select Part */}
                    {selectedCourse && (
                        <select className="admin-input" value={selectedPart} onChange={(e) => setSelectedPart(e.target.value)}>
                            <option value="">Select Part</option>
                            {parts.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Existing lessons */}
                    {selectedPart && lessons.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Existing Lessons (click to edit):</h4>
                            <select
                                className="admin-input"
                                value={selectedLessonId}
                                onChange={(e) => setSelectedLessonId(e.target.value)}
                            >
                                <option value="">Select a lesson to edit...</option>
                                {lessons.map((l) => (
                                    <option key={l._id} value={l._id}>{l.title}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Lesson name */}
                    <h3>{selectedLessonId ? "Edit Lesson" : "Add New Lesson"}</h3>
                    <input className="admin-input" type="text" placeholder="Lesson Title" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} />
                    <div className="mt-5 border rounded-xl bg-white p-3 shadow">
                        <EditorMenuBar editor={editor} />
                        <div style={{ height: '600px', overflowY: 'auto' }}>
                            <EditorContent editor={editor} className="min-h-[250px] p-3" />
                        </div>
                    </div>
                    <button className="admin-submit mt-4" onClick={handleAddOrUpdateLesson}>
                        {selectedLessonId ? "Update Lesson" : "Submit New Lesson"}
                    </button>
                    {selectedLessonId && (
                        <button className="admin-cancel-btn mt-2" onClick={() => setSelectedLessonId("")}>
                            Cancel Edit (Add New)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;