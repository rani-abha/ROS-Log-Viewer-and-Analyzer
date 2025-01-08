import re
from datetime import datetime
from models import LogEntry

class LogParser:
    # LOG_PATTERN = re.compile(r'\[(.*?)\] \[(.*?)\] \[(.*?)\] (.*)')
    LOG_PATTERN = re.compile(
        r'^\[(?P<timestamp>.*?)\] \[(?P<severity>INFO|WARN|ERROR|DEBUG|FATAL)\] \[(?P<node>.*?)\] (?P<message>.*)$'
    )

    # LOG_PATTERN = re.compile(
    #     r'^\[(?P<timestamp>.*?)\] \[(?P<severity>INFO|WARN|ERROR|DEBUG|FATAL)\] \[(?P<node>.*?)\]: (?P<message>.*)$'
    # )

    def parse(self, filepath):
        log_entries = []
        with open(filepath, 'r') as file:
            for line in file:
                match = self.LOG_PATTERN.match(line.strip())
                stripped_line = line.strip()
                # print(f"Line to match: '{repr(stripped_line)}'")
                # print(f"Match: {match}")
                if match:
                    timestamp = datetime.strptime(match.group('timestamp'), '%Y-%m-%d %H:%M:%S')
                    severity = match.group('severity')
                    node = match.group('node')
                    message = match.group('message')
                    log_entries.append(LogEntry(timestamp, severity, node, message))
                    # print(f"Groups: {match.groupdict()}")
                    # log_entries.append(match)
        return log_entries
