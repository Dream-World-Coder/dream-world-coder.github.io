<!--metadata
  title: "Media.net On-Campus Summer Internship Interview Experience"
  authors: ["Subhajit Gorai"]
  dateCreated: "21/08/2026"
  dateEdited: "21/08/2026"
  description: "A detailed account of my on-campus summer internship interview experience at Media.net, covering the OA, core CS subjects, and algorithm rounds."
  tags: ["Interview Experience", "Media.net", "Summer Internship", "On-Campus", "Algorithms"]
-->

# My media.net Interview Experience (for SRE Internship)

## Brief
- Mode: On Campus (Tier 1.5 college)
- stipend: 1L/month
- Duration: 2 months (summer internship)
- It was during my 5th semester

## OA:
3 questions
difficulty: Medium, Hard, Hard

I could solve 1.5 (2nd qn got TLE two times so score dropped)

Strict plagarism checker was enabled, only 4 people were selected for next round.


## Interview:
Interviewer had 3 YOE.
Just a brief intro then we went to question.
He asked _"BST vs sorted Array"_ question(Its a standard media.net interview problem) and checked my whole data structure knowledge with lots of hypothetical situations like infinite memory etc. Difficulty was easy.

Next he asked 3 OS questions (one question and then follow ups). I could n't answer the last one.
Then he asked how is my DBMS knowledge, or should he ask from other subjects (as our 5th sem just started back then so these were not covered by then, I personally studied a bit but it was not sufficient). So he asked from automata theory (TOC).
Qns were ->
- DFA vs NFA
- something on regex which I can't remember rn

answered both

__Then Algorithm part__
He gave a situation. I had to ask questions & clarifications to get proper constraints and edge cases.

Question:
```txt
we have a company where every employee reports to a manager except the ceo. 
They report to only one manager. This forms a proper hierarchy. 
Everyone's salary is initially 0, now I have to perform a set of tasks on specific employees. 
like increment or decrement salary. 
Now the task is to do it in such a way so that the salary is maximised for everyone.

- we have to return the sum of everyone's salary after transformation.
- every employee can be manager themselves.
- I cannot do it for a specific employee, i have to increment or decrement it for his department.

input:
3 1 [Total no of employees 3, total no of tasks 1]
1 2 [1 manager of 2]
1 3 [1 manager of 3]
2 10 2 3 [task: no of employee: 2, increment: 10, employee list: [2, 3]]
```

It took me quite some time to get the qn, at first I was thinking with segment tree and then LCA but eventually I managed to explain the algorithm for it. But I had no time left to code by then.

He said he could give me 5 more minutes if I can code it, but I said no as my confidence was gone. (It was my first ever interview, and I messed up)


Verdict: Rejected.


__Solution:__
```py
def solve():
    # read inp
    ip = sys.stdin.read().split()
    if not ip:
        return

    # total employees (n) and total tasks (t)
    n = int(ip[0])
    t = int(ip[1])

    # init tree str
    adj = {i: [] for i in range(1, n + 1)}
    in_deg = {i: 0 for i in range(1, n + 1)}

    # make the tree from n-1 edges
    idx = 2
    for _ in range(n - 1):
        u = int(ip[idx])
        v = int(ip[idx+1])
        adj[u].append(v)
        in_deg[v] += 1
        idx += 2

    # find ceo (root node with no manager)
    root = -1
    for i in range(1, n + 1):
        if in_deg[i] == 0:
            root = i
            break

    # calc the dept size for each employee using dfs
    subtree_size = [0] * (n + 1)

    def dfs(node):
        size = 1 # it counts the employee themselves
        for child in adj[node]:
            size += dfs(child)
        subtree_size[node] = size
        return size

    if root != -1:
        dfs(root)

    res = 0 # tot salary sum

    # process tasks
    for _ in range(t):
        k = int(ip[idx]) # no of candidate employees
        val = int(ip[idx+1]) # inc/dec value

        candidates = []
        for i in range(k):
            candidates.append(int(ip[idx + 2 + i]))

        idx += 2 + k

        if val >= 0:
            # for inc, maximize the profit by choosing the largest dept
            best_size = -1
            for emp in candidates:
                if subtree_size[emp] > best_size:
                    best_size = subtree_size[emp]
            res += best_size * val
        else:
            # for dec, minimize the loss by choosing the smallest dept
            best_size = float('inf')
            for emp in candidates:
                if subtree_size[emp] < best_size:
                    best_size = subtree_size[emp]
            res += best_size * val

    print(res)
```
