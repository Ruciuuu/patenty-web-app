import { createClient } from "../auth/supabase-server";
import { getCurrentSchool } from "./get-current-school";






export async function getSchoolStudents() {

    const supabase = await createClient();
    const currentSchool = await getCurrentSchool();
 

    const schoolId = currentSchool.school.id 

      const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
          
        }
    }

    const data = await supabase
    .from("school_memberships")
    .select("user_id")
    .eq("school_id", schoolId)
    .eq("role", "student")
    
    return (
        data
    )


}