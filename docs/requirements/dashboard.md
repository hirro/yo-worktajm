# Dashboard
Dashboard is the main working place where the user spends the most of the time on the site. The design goal is at it should be possible to manage all daily tasks from this page. More complex items are made in “[Settings](https://github.com/hirro/yo-worktajm/docs/settings.md)”. 

# Header and footer
The menu has two choices:
* Main (this page)
* [Reports](https://github.com/hirro/yo-worktajm/docs/reports.md) 

# Views
The page is divided in two views, the project list view and the time entry list view.
## Project list view
The project list view lists all the projects ordered by relevance. For the moment it is by last usage, recently used projects are at the top of the list.

When clicking on the project list item it **expands** to the project list item view.

The user may also stop or start a project by pressing the **start** or **stop** button.

### Expanded project list item view
This is implemented as an expandable item instead of a modal or slide-in. The reasoning was that the look-and-feel of the pivotal tracker project was excellent and I wanted to do something similar.

This view allows the user to:
1. **Edit - Project name**: [Implemented] 
Once saved, the project name will be updated in all other views.
2. **Edit - Customer name**: [#NNNNNN] 
If there are any customers registered this allows user to enter the customer name.
3. **Edit - Rate**: [#NNNNNN] 
Only enabled if project is associated to a customer. Allows the user to edit the rate for the project. 
4. **Button - Delete / Disable the project**: 
[Implemented] Deletes the project if the project does not have any time entries associated to it. 
[#77948918] When project is deleted, it should be marked as inactive if it has any time entries associated to it*

5. **Edit - Labels**
[#NNN]
Allow the user to assign labels/tags to a project.

## Time Entry View
The time entry view allows the user to see the logged time entries.
### Filters
It is possible to apply one or more filters. 
The following filters may be implemented:
* Date [#implemented]: Select a single date/week/month depending of the view option.
* Project [#NNN] (one or more projects selected)
* Tag [Requires filters] (one or more tags selected)
* Customer (one or more customers selected)

### Views
* By day
* By week
* By month


### Random implementation note
*Currently all time entries are kept in memory, this will make it easier to implement offline mode.*
